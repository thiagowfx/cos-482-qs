package br.ufrj.cos482.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A AlunoDoutorado.
 */
@Entity
@Table(name = "aluno_doutorado")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AlunoDoutorado implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private DocumentoSistema ataDissertacao;

    @OneToOne
    @JoinColumn(unique = true)
    private DocumentoSistema certidaoConclusao;

    @OneToOne
    @JoinColumn(unique = true)
    private DocumentoSistema diplomaMestrado;

    @ManyToOne
    private Aluno aluno;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public DocumentoSistema getAtaDissertacao() {
        return ataDissertacao;
    }

    public AlunoDoutorado ataDissertacao(DocumentoSistema documentoSistema) {
        this.ataDissertacao = documentoSistema;
        return this;
    }

    public void setAtaDissertacao(DocumentoSistema documentoSistema) {
        this.ataDissertacao = documentoSistema;
    }

    public DocumentoSistema getCertidaoConclusao() {
        return certidaoConclusao;
    }

    public AlunoDoutorado certidaoConclusao(DocumentoSistema documentoSistema) {
        this.certidaoConclusao = documentoSistema;
        return this;
    }

    public void setCertidaoConclusao(DocumentoSistema documentoSistema) {
        this.certidaoConclusao = documentoSistema;
    }

    public DocumentoSistema getDiplomaMestrado() {
        return diplomaMestrado;
    }

    public AlunoDoutorado diplomaMestrado(DocumentoSistema documentoSistema) {
        this.diplomaMestrado = documentoSistema;
        return this;
    }

    public void setDiplomaMestrado(DocumentoSistema documentoSistema) {
        this.diplomaMestrado = documentoSistema;
    }

    public Aluno getAluno() {
        return aluno;
    }

    public AlunoDoutorado aluno(Aluno aluno) {
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
        AlunoDoutorado alunoDoutorado = (AlunoDoutorado) o;
        if(alunoDoutorado.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, alunoDoutorado.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "AlunoDoutorado{" +
            "id=" + id +
            '}';
    }
}
