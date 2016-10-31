package br.ufrj.cos482.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import br.ufrj.cos482.domain.enumeration.StatusMatricula;

/**
 * A Aluno.
 */
@Entity
@Table(name = "aluno")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Aluno implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "dre")
    private String dre;

    @Enumerated(EnumType.STRING)
    @Column(name = "matricula")
    private StatusMatricula matricula;

    @OneToOne
    @JoinColumn(unique = true)
    private DocumentoSistema declaracaoConclusao;

    @OneToOne
    @JoinColumn(unique = true)
    private DocumentoSistema historicoGradaucao;

    @ManyToOne
    private Usuario usuario;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "aluno_orientador",
               joinColumns = @JoinColumn(name="alunos_id", referencedColumnName="ID"),
               inverseJoinColumns = @JoinColumn(name="orientadors_id", referencedColumnName="ID"))
    private Set<Professor> orientadors = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDre() {
        return dre;
    }

    public Aluno dre(String dre) {
        this.dre = dre;
        return this;
    }

    public void setDre(String dre) {
        this.dre = dre;
    }

    public StatusMatricula getMatricula() {
        return matricula;
    }

    public Aluno matricula(StatusMatricula matricula) {
        this.matricula = matricula;
        return this;
    }

    public void setMatricula(StatusMatricula matricula) {
        this.matricula = matricula;
    }

    public DocumentoSistema getDeclaracaoConclusao() {
        return declaracaoConclusao;
    }

    public Aluno declaracaoConclusao(DocumentoSistema documentoSistema) {
        this.declaracaoConclusao = documentoSistema;
        return this;
    }

    public void setDeclaracaoConclusao(DocumentoSistema documentoSistema) {
        this.declaracaoConclusao = documentoSistema;
    }

    public DocumentoSistema getHistoricoGradaucao() {
        return historicoGradaucao;
    }

    public Aluno historicoGradaucao(DocumentoSistema documentoSistema) {
        this.historicoGradaucao = documentoSistema;
        return this;
    }

    public void setHistoricoGradaucao(DocumentoSistema documentoSistema) {
        this.historicoGradaucao = documentoSistema;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public Aluno usuario(Usuario usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Set<Professor> getOrientadors() {
        return orientadors;
    }

    public Aluno orientadors(Set<Professor> professors) {
        this.orientadors = professors;
        return this;
    }

    public Aluno addOrientador(Professor professor) {
        orientadors.add(professor);
        return this;
    }

    public Aluno removeOrientador(Professor professor) {
        orientadors.remove(professor);
        return this;
    }

    public void setOrientadors(Set<Professor> professors) {
        this.orientadors = professors;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Aluno aluno = (Aluno) o;
        if(aluno.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, aluno.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Aluno{" +
            "id=" + id +
            ", dre='" + dre + "'" +
            ", matricula='" + matricula + "'" +
            '}';
    }
}
