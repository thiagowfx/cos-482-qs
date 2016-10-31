package br.ufrj.cos482.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

import br.ufrj.cos482.domain.enumeration.StatusConta;

/**
 * A Usuario.
 */
@Entity
@Table(name = "usuario")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Usuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    @Enumerated(EnumType.STRING)
    @Column(name = "conta")
    private StatusConta conta;

    @OneToOne
    @JoinColumn(unique = true)
    private DocumentoIdentificacao cpf;

    @OneToOne
    @JoinColumn(unique = true)
    private DocumentoIdentificacao rg;

    @OneToOne
    @JoinColumn(unique = true)
    private DocumentoIdentificacao tituloDeEleitor;

    @OneToOne
    @JoinColumn(unique = true)
    private DocumentoIdentificacao dispensaMilitar;

    @OneToOne
    @JoinColumn(unique = true)
    private DocumentoIdentificacao passaporte;

    @OneToOne
    @JoinColumn(unique = true)
    private User systemUser;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Usuario nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public StatusConta getConta() {
        return conta;
    }

    public Usuario conta(StatusConta conta) {
        this.conta = conta;
        return this;
    }

    public void setConta(StatusConta conta) {
        this.conta = conta;
    }

    public DocumentoIdentificacao getCpf() {
        return cpf;
    }

    public Usuario cpf(DocumentoIdentificacao documentoIdentificacao) {
        this.cpf = documentoIdentificacao;
        return this;
    }

    public void setCpf(DocumentoIdentificacao documentoIdentificacao) {
        this.cpf = documentoIdentificacao;
    }

    public DocumentoIdentificacao getRg() {
        return rg;
    }

    public Usuario rg(DocumentoIdentificacao documentoIdentificacao) {
        this.rg = documentoIdentificacao;
        return this;
    }

    public void setRg(DocumentoIdentificacao documentoIdentificacao) {
        this.rg = documentoIdentificacao;
    }

    public DocumentoIdentificacao getTituloDeEleitor() {
        return tituloDeEleitor;
    }

    public Usuario tituloDeEleitor(DocumentoIdentificacao documentoIdentificacao) {
        this.tituloDeEleitor = documentoIdentificacao;
        return this;
    }

    public void setTituloDeEleitor(DocumentoIdentificacao documentoIdentificacao) {
        this.tituloDeEleitor = documentoIdentificacao;
    }

    public DocumentoIdentificacao getDispensaMilitar() {
        return dispensaMilitar;
    }

    public Usuario dispensaMilitar(DocumentoIdentificacao documentoIdentificacao) {
        this.dispensaMilitar = documentoIdentificacao;
        return this;
    }

    public void setDispensaMilitar(DocumentoIdentificacao documentoIdentificacao) {
        this.dispensaMilitar = documentoIdentificacao;
    }

    public DocumentoIdentificacao getPassaporte() {
        return passaporte;
    }

    public Usuario passaporte(DocumentoIdentificacao documentoIdentificacao) {
        this.passaporte = documentoIdentificacao;
        return this;
    }

    public void setPassaporte(DocumentoIdentificacao documentoIdentificacao) {
        this.passaporte = documentoIdentificacao;
    }

    public User getSystemUser() {
        return systemUser;
    }

    public Usuario systemUser(User user) {
        this.systemUser = user;
        return this;
    }

    public void setSystemUser(User user) {
        this.systemUser = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Usuario usuario = (Usuario) o;
        if(usuario.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, usuario.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Usuario{" +
            "id=" + id +
            ", nome='" + nome + "'" +
            ", conta='" + conta + "'" +
            '}';
    }
}
