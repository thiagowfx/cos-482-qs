package br.ufrj.cos482.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A AlunoMestrado.
 */
@Entity
@Table(name = "aluno_mestrado")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AlunoMestrado implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private DocumentoSistema diplomaGraduacao;

    @OneToOne
    @JoinColumn(unique = true)
    private DocumentoSistema certidadoConclusao;

    @OneToOne
    @JoinColumn(unique = true)
    private DocumentoSistema certidaoColacao;

    @ManyToOne
    private Aluno aluno;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DocumentoSistema getDiplomaGraduacao() {
        return diplomaGraduacao;
    }

    public AlunoMestrado diplomaGraduacao(DocumentoSistema documentoSistema) {
        this.diplomaGraduacao = documentoSistema;
        return this;
    }

    public void setDiplomaGraduacao(DocumentoSistema documentoSistema) {
        this.diplomaGraduacao = documentoSistema;
    }

    public DocumentoSistema getCertidadoConclusao() {
        return certidadoConclusao;
    }

    public AlunoMestrado certidadoConclusao(DocumentoSistema documentoSistema) {
        this.certidadoConclusao = documentoSistema;
        return this;
    }

    public void setCertidadoConclusao(DocumentoSistema documentoSistema) {
        this.certidadoConclusao = documentoSistema;
    }

    public DocumentoSistema getCertidaoColacao() {
        return certidaoColacao;
    }

    public AlunoMestrado certidaoColacao(DocumentoSistema documentoSistema) {
        this.certidaoColacao = documentoSistema;
        return this;
    }

    public void setCertidaoColacao(DocumentoSistema documentoSistema) {
        this.certidaoColacao = documentoSistema;
    }

    public Aluno getAluno() {
        return aluno;
    }

    public AlunoMestrado aluno(Aluno aluno) {
        this.aluno = aluno;
        return this;
    }

    public void setAluno(Aluno aluno) {
        this.aluno = aluno;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AlunoMestrado alunoMestrado = (AlunoMestrado) o;
        if(alunoMestrado.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, alunoMestrado.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "AlunoMestrado{" +
            "id=" + id +
            '}';
    }
}
